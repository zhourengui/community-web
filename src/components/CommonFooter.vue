<template>
  <div class="common-footer">
    <div class="common-footer_copy">
      <span>2020 &copy; Little Boy 出品</span>
    </div>
    <div class="common-footer_concat">
      <span>联系方式一</span>
      <span>联系方式二</span>
      <span>联系方式三</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "common-footer",
}
</script>

<style scoped lang="scss">
.common-footer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  padding: 24px 0;
  box-sizing: border-box;
  color: #666666;
  &_copy {
    display: flex;
    align-items: center;
  }
  &_concat {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 300px;
  }
}
</style>
