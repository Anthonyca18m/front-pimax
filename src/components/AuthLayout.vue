<template>
  <div>
    <div class="background-image">
      <router-view></router-view>
    </div>
    <div class="footer">
        <p>© Sistema de Control de Asistencias - PIMAX</p>
        <p></p>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
  .footer {
    position:absolute;
    width: 100%;
    bottom: 0;
    background: rgb(255 255 255 / 83%);
    text-align: center;
    padding-top: 1rem;
  }
  .background-image {
    background-image: url(images/background.webp); 
    height: 100%; 
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>