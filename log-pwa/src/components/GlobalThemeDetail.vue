<template>
  <div class="context-detail" v-html="jsonString"></div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { StyleTogglerMixin } from 'jscatalyst';
import Messaging from '@/mixins/Messaging';
import Windowing from '@/mixins/Windowing';
import JSONtoHTML from '@/mixins/JSONtoHTML';

export default {
  name: 'globalThemeDetail',
  mixins: [Messaging, Windowing, StyleTogglerMixin, JSONtoHTML],
  props: ['contextName'],
  data() {
    return {
      ctxInfo: {},
      contextKey: null
    }
  },
  methods: {
    toggleClicked() {
      this.clicked = !this.clicked
    }
  },
  created() {
    this.contextKey = this.subscribe(this.contextName, (context, delta, removed) => {
      // debugger
      this.ctxInfo = context;
    console.log("name global theme", this.contextName)
    console.log("info global them", this.ctxInfo)
    });
  }
}
</script>

<style>
  .context-detail {
  display:flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
</style>

