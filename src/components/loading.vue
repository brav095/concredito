<template>
  <div>
    <div class="overlay activ">
      <div class="cursor"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: 0.1s ease;
  z-index: -1;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay.activ {
  opacity: 0.5;
  z-index: 9999;
}

.cursor,
.cursor:before,
.cursor:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  animation: load 1.5s infinite ease-in-out;
  z-index: 9999;
}

.cursor {
  color: white;
  font-size: 20px;
  position: relative;
  animation-delay: -.16s;
}

.cursor:before,
.cursor:after {
  content: "";
  position: absolute;
  top: 0;
}

.cursor:before {
  left: -3.5em;
}

.cursor:after {
  right: -3.5em;
  animation-delay: -.16s;

}

@keyframes load {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }

  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>
