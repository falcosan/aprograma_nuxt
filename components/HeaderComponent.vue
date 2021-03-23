<template>
  <header class="header top-0 z-10 fixed h-20 w-auto justify-between mt-0">
    <nav class="navbar">
      <ul class="menu_wrapper">
        <li class="link_menu">
          <nuxt-link
            class="link_item inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
            to="/"
          >
            Home
          </nuxt-link>
        </li>
        <li class="link_menu">
          <nuxt-link
            class="link_item inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
            to="/about"
          >
            About
          </nuxt-link>
        </li>
        <li class="link_menu">
          <nuxt-link
            class="link_item inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
            to="/blog"
          >
            Blog
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
</script>

