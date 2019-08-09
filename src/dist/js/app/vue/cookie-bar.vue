<template>
  <div class="vue-cookie-bar" v-if="!accepted">
    <div class="margin-right-0-5">
      By continuing to use this website, you consent to <a :href="url" target="_blank">our cookie policy</a>.
    </div>
    <div>
      <button v-on:click.prevent="acceptCookieTerms"><i class="icofont-close line-height-1 font-size-20"></i></button>
    </div>
  </div>
</template>

<style scoped lang="vue-scss">
  .vue-cookie-bar {
    padding: 5px 10px 5px 15px;
    border-radius: 0 3px 0 0;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0; left: 0;
    z-index: 900;
    color: #8a8a8a;
    font-size: 13px;
    background: #e6e4e4;
    a, button {
      color: darken(#8a8a8a, 20%);
      &:hover {
        color: darken(#8a8a8a, 40%);
      }
    }
    button {
      height: 20px;
      margin-top: 2px;
    }
  }
</style>

<script>
  import Store from 'store'

  // Get local storage item.
  const acceptedStorage = Store.get('cookie_terms_accepted')

	export default {
    props: {
      url: String
    },
		data() 
		{
      return {
				accepted: (acceptedStorage) ? true : false,
      }
		},
		mounted() 
		{
    },
		computed: {
		},
		watch: {
      accepted(val)
      {
        // Update local storage.
        Store.set('cookie_terms_accepted', true)
      }
		},
    methods: {
      acceptCookieTerms()
      {
        // Update param.
        this.accepted = true
      }
    }
	}
</script>