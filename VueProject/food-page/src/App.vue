<template>
  <div class="wrapper">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {margin: 0 ;padding: 0;}
</style>
