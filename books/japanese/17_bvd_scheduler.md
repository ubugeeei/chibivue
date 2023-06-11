[Prev](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/16_bvd_bit_flags.md) | [Next](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/18_bvd_patch_other_attrs.md)

---
title: "スケジューラ"
---

# effect のスケジューリング

まずはこのコードをご覧ください。

```ts
import { createApp, h, reactive } from "chibivue";

const app = createApp({
  setup() {
    const state = reactive({
      message: "Hello World",
    });
    const updateState = () => {
      state.message = "Hello ChibiVue!";
      state.message = "Hello ChibiVue!!";
    };

    return () => {
      console.log("😎 rendered!");

      return h("div", { id: "app" }, [
        h("p", {}, [`message: ${state.message}`]),
        h("button", { onClick: updateState }, ["update"]),
      ]);
    };
  },
});

app.mount("#app");
```

ボタンをクリックすると、state.message に対して 2 回 set が起こるので、当然 2 回 trigger が実行されることになります。
つまりは、2 回仮想 DOM が算出され、2 回 patch が行われます。

![non_scheduled_effect](https://raw.githubusercontent.com/Ubugeeei/chibivue/main/books/images/non_scheduled_effect.png)

しかし、実際に patch 処理を行うのは 2 回目のタイミングだけで十分なはずです。  
そこで、スケジューラを実装します。スケジューラというのはあるタスクに対する実行順番であったり、実行を管理するものです。
Vue のスケジューラの役割の一つとして、リアクティブな作用をキューで管理し、まとめられるものはまとめる、というのがあります。

具体的には キュー をもち、ジョブを管理します。ジョブは id を持っており、キューに新しくジョブがエンキューされる際に、既に同一の id を持ったジョブが存在していた場合に上書きしてしまいます。

```ts
export interface SchedulerJob extends Function {
  id?: number;
}

const queue: SchedulerJob[] = [];

export function queueJob(job: SchedulerJob) {
  if (
    !queue.length ||
    !queue.includes(job, isFlushing ? flushIndex + 1 : flushIndex)
  ) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
```

肝心のジョブの id ですが、今回の場合はコンポーネント単位でまとめたいので、コンポーネントに uid を持たせるようにして、それらを job の id となるように自走します。

uid といっても単にインクリメントによって得られる識別子です。

実際にソースコードを読みながらスケジューラを実装してみましょう !

# nextTick が欲しい

スケジューラの実装をする際にソースコードを読んだかたは「nextTick ってここで出てくるのか」というのに気づいた方もいるかもしれません。
まずは今回実現したい課題についてです。こちらのコードをご覧ください。

```ts
import { createApp, h, reactive } from "chibivue";

const app = createApp({
  setup() {
    const state = reactive({
      count: 0,
    });
    const updateState = () => {
      state.count++;

      const p = document.getElementById("count-p");
      if (p) {
        console.log("😎 p.textContent", p.textContent);
      }
    };

    return () => {
      return h("div", { id: "app" }, [
        h("p", { id: "count-p" }, [`${state.count}`]),
        h("button", { onClick: updateState }, ["update"]),
      ]);
    };
  },
});

app.mount("#app");
```

こちらのボタンをクリックしてみてコンソールを覗いてみましょう。

![old_state_dom](https://raw.githubusercontent.com/Ubugeeei/chibivue/main/books/images/old_state_dom.png)

`state.count`を更新した後にコンソールに出力しているのに、情報が古くなってしまっています。  
それもそのはずステートを更新しても瞬時に DOM が更新されるわけではなく、コンソールに出力した段階ではまだ DOM は古い状態のままです。

ここで登場するのが nextTick です。

https://vuejs.org/api/general.html#nexttick

この nextTick というのはスケジューラの API で、スケジューラによって DOM に変更が適応されるまで待つことができます。  
nextTick の実装方法ですが、非常に単純で、スケジューラ内で今 flush しているジョブ(promise)を保持しておいて、それの then に繋ぐだけです。

```ts
export function nextTick<T = void>(
  this: T,
  fn?: (this: T) => void
): Promise<void> {
  const p = currentFlushPromise || resolvedPromise;
  return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
```

そのジョブが完了した(promise が resolve された)際に nextTick に渡されたコールバックを実行するということです。(キューにジョブがなければ resolvedPromise の then に繋ぎます)  
当然、この nextTick 自体も Promise を返すため、開発者インターフェースとしては、コールバックに渡すのもよし、nextTick を await するのもよし、といった感じになっているわけです。

```ts
import { createApp, h, reactive, nextTick } from "chibivue";

const app = createApp({
  setup() {
    const state = reactive({
      count: 0,
    });
    const updateState = async () => {
      state.count++;

      await nextTick(); // 待つ
      const p = document.getElementById("count-p");
      if (p) {
        console.log("😎 p.textContent", p.textContent);
      }
    };

    return () => {
      return h("div", { id: "app" }, [
        h("p", { id: "count-p" }, [`${state.count}`]),
        h("button", { onClick: updateState }, ["update"]),
      ]);
    };
  },
});

app.mount("#app");
```

![next_tick](https://raw.githubusercontent.com/Ubugeeei/chibivue/main/books/images/next_tick.png)

さて、実際に今のスケジューラの実装を`currentFlushPromise`を保持しておくような実装に書き換えて、nextTick を実装してみましょう!


[Prev](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/16_bvd_bit_flags.md) | [Next](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/18_bvd_patch_other_attrs.md)