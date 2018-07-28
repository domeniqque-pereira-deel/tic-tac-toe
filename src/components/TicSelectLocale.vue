<template>
  <div class="locales">
    <ul class="options">
      <li :class="{'active': currentLocale === 'en'}"
        @click="setLocale('en')">
        {{ $t('game.actions.locales.english') }}
      </li>
      <li :class="{'active': currentLocale === 'pt'}"
        @click="setLocale('pt')">
        {{ $t('game.actions.locales.portuguese') }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getStorage, setStorage } from '@/utils'

export default {
  computed: {
    currentLocale () {
      return this.$i18n.locale
    }
  },
  mounted () {
    this.setLocale()
  },

  methods: {
    setLocale (locale = null) {
      if (locale === null) {
        locale = getStorage('game_locale') || setStorage('game_locale', 'en')
      } else {
        setStorage('game_locale', locale)
      }

      this.$i18n.locale = locale
    }
  }
}
</script>

<style scoped>
.locales {
  padding: 10px 0;
  display: flex;
  justify-content: center;
}

.options li {
  display: inline-block;
  border-radius: 5px;
  padding: 4px 0;
  width: 90px;
  text-align: center;
  font-size: 0.8em;
  font-family: var(--font-secondary);
}

.active {
  box-shadow: 0 0 4px rgba(0,0,0,.3);
  border-bottom: 4px solid #1C4678;
}
</style>
