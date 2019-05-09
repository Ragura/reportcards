<template>
  <transition name="modal">
    <div class="modal-mask flex justify-center items-center" @click="close">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <slot name="header"></slot>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="flex flex-col md:flex-row justify-center items-center mt-4">
          <button
            @click="close"
            class="w-full md:w-1/3 rounded border border-gray-400
               font-semibold p-2 mr-0 md:mr-4 mb-2 md:mb-0"
          >
            Annuleren
          </button>
          <button
            @click="ok"
            class="w-full md:w-1/3 rounded bg-blue-400 text-white font-semibold p-2"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    close: function() {
      this.$emit("close");
    },
    ok: function() {
      this.$emit("ok");
    }
  }
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 400px;
  /* margin: 0 auto; */

  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.text-right {
  text-align: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
