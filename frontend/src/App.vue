<script setup lang="ts">
import CalendarReport from './pages/report/CalendarReport.vue';
import InWork from './pages/working/InWork.vue';

</script>
<template>
  <div class="container h-screen font-semibold text-3xl text-gray-800 w-screen">
    <nav class="absolute">
      <div id="menuToggle">
        <input type="checkbox" />
        <span />
        <span />
        <span />
        <ul id="menu">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Info</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </nav>
    <!-- <CalendarReport /> -->
    <div class="pt-6">
      <InWork />
    </div>
  </div>
</template>
<style>

#menuToggle {
  display: flex;
  flex-direction: column;
  position: relative;
  top: 25px;
  left: 25px;
  z-index: 1;
  -webkit-user-select: none;
  user-select: none;
}

#menuToggle input
{
  display: flex;
  width: 40px;
  height: 32px;
  position: absolute;
  cursor: pointer;
  opacity: 0;
  z-index: 2;
}

#menuToggle span
{
  display: flex;
  width: 29px;
  height: 2px;
  margin-bottom: 5px;
  position: relative;
  background: #36383F;
  border-radius: 3px;
  z-index: 1;
  transform-origin: 5px 0px;
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              opacity 0.55s ease;
}

#menuToggle span:first-child
{
  transform-origin: 0% 0%;
}

#menuToggle span:nth-last-child(2)
{
  transform-origin: 0% 100%;
}

#menuToggle input:checked ~ span
{
  opacity: 1;
  transform: rotate(45deg) translate(-3px, -1px);
  background: #36383F;
}
#menuToggle input:checked ~ span:nth-last-child(3)
{
  opacity: 0;
  transform: rotate(0deg) scale(0.2, 0.2);
}

#menuToggle input:checked ~ span:nth-last-child(2)
{
  transform: rotate(-45deg) translate(0, -1px);
}

#menu
{
  position: absolute;
  width: 180px;
  height: 400px;
  box-shadow: 0 0 10px #85888C;
  margin: -50px 0 0 -50px;
  padding: 50px;
  padding-top: 125px;
  background-color: #F5F6FA;
  -webkit-font-smoothing: antialiased;
  transform-origin: 0% 0%;
  transform: translate(-100%, 0);
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
}

#menu li
{
  padding: 10px 0;
  transition-delay: 2s;
}

#menuToggle input:checked ~ ul
{
  transform: none;
}
</style>
