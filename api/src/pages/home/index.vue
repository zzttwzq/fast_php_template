<template>
  <a-card title="home">
    <a-row justify="space-between">
      <a-col :span="7"><a-input v-model="host" /></a-col>
      <a-col :span="10">&nbsp; {{ uri }}</a-col>
      <a-col :span="2"><a-button @click="testClick">测试</a-button></a-col>
    </a-row>
    <div class="backview">
      <div class="left">
        <CustomFormList
          :prefixClick="prefixClick"
          :suffixClick="suffixClick"
          :submitClick="submitClick"
          :cancelClick="cancelClick"
          ref="form"
          :list="formList"
          :showBtns="false"
        ></CustomFormList>
      </div>
      <div class="right">
        <a-textarea v-model="resultText"></a-textarea>
      </div>
    </div>
  </a-card>
</template>

<script>
import {} from "@/api/admin_request";
import { importXLSX } from "@/utils/excel";

export default {
  name: "home",
  data() {
    return {
      host: "https://www.baidu.com",
      uri: "/blog/test/ddd",
      resultText: "",
      formList: [
        {
          name: "字段名称",
          type: "text", // text, number, numberRange, select, date, datetime, dateRange
          // decorator: [
          //   "nameCn",
          //   {
          //     rules: [{ required: true, message: "请输入字段名称" }],
          //   },
          // ],
        },
      ],
    };
  },
  mounted() {},
  methods: {
    testClick() {

      this.$refs.form.getForm().validateFields((err, values) => {
        if (!err) {
          console.log(">>>values ", values);
        }
        else {
          console.log(err);
        }
      });
    },
    prefixClick(e) {
      this.$emit("prefixClick", e);
    },
    suffixClick(e) {
      this.$emit("suffixClick", e);
    },
    submitClick(data) {
      console.log(data);
    },
    cancelClick() {},
  },
};
</script>

<style lang="less" scoped>
.backview {
  display: flex;
  flex-direction: row;
  padding-top: 20px;
  .left {
    flex: 1;
    padding-right: 10px;
  }

  .right {
    flex: 1;
    padding-left: 10px;
  }
}
</style>
