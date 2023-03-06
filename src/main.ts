import Route from "./router";

document.addEventListener('DOMContentLoaded', () => {
  // document.body.addEventListener('click', (e) => {
  //   const $a = (e.target as HTMLElement).closest('a')
  //   if ($a?.matches('[data-link]')) {
  //     e.preventDefault()
  //     // navigateTo($a.href)
  //   }
  // })

  // window.addEventListener('popstate', router)

  new Route(document.querySelector('#app')!);
})
