<template>
  <div class="loader-wrapper">
    <div class="loader"></div>
  </div>
</template>

<style>
.loader-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.24);
  z-index: 100;
}
.loader,
.loader:after {
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
}
.loader {
  position: relative;
  margin: auto;
  text-indent: -9999em;
  border-top: 4px solid rgba(255, 255, 255, 0.2);
  border-right: 4px solid rgba(255, 255, 255, 0.2);
  border-bottom: 4px solid rgba(255, 255, 255, 0.2);
  border-left: 4px solid #ffffff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
