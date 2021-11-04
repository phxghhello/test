修改title

```js
// main.js
router.beforeEach((to,from,next)=>{
  if(to.meta.title){
      document.title=to.meta.title
  }
  next()
})
```



```js
// 在组件中
   beforeRouteEnter(to, from, next) {
    console.log(this, 'beforeRouteEnter'); // undefined
    console.log(to, '组件独享守卫beforeRouteEnter第一个参数');
    console.log(from, '组件独享守卫beforeRouteEnter第二个参数');
    console.log(next, '组件独享守卫beforeRouteEnter第三个参数');
    next(vm => {
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      console.log(vm);//当前组件的实例
      document.title=vm.fund.fundName
    });
  }
```

