<template>
  <a-layout>
    <Header :curKey="site" />
    <a-layout>
      <Side :list="list" />
      <a-layout style="padding: 0 24px 24px">
        <Crumb :curPage="curPage" />
        <Content>
          <a-form class="common-form" layout="inline" @submit="handleSubmit">
            <a-form-item>
              <label class="tip" for="wxid">用户微信ID/昵称</label>
              <a-input id="wxid" size="large" placeholder="请输入" />
            </a-form-item>
            <a-form-item>
              <label class="tip" for="order_amount">订单金额</label>
              <a-input id="order_amount" size="large" placeholder="请输入" />
            </a-form-item>
            <a-form-item>
              <span class="tip">充值时间</span>
              <a-range-picker size="large" style="width: 275px" :placeholder="['开始日期', '结束日期']" @change="datePickerOnChange" />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" size="large" htmlType="submit">查找</a-button>
            </a-form-item>
          </a-form>
          <a-table
            bordered
            :columns="columns"
            :dataSource="tableData"
            :pagination="pagination"
          />
        </Content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import Header from "../../layout/header.vue";
import Side from "../../layout/sidebar.vue";
import Content from "../../layout/content.vue";
import Crumb from "../../components/breadCrumb.vue";

export default {
  components: {
    Header,
    Side,
    Content,
    Crumb
  },
  data() {
    return {
      site: "3",
      list: [
        {
          name: "订单管理",
          path: "/orders",
          key: "1"
        }
      ],
      curPage: "订单管理",
      columns: [
        {
          title: "序号",
          dataIndex: "id"
        },
        {
          title: "用户微信ID/昵称",
          dataIndex: "user_id"
        },
        {
          title: "充值金额",
          dataIndex: "recharge_amount"
        },
        {
          title: "充值时间",
          dataIndex: "recharge_time"
        },
        {
          title: "订单编号",
          dataIndex: "order_number"
        }
      ],
      tableData: [
        {
          key: "1",
          id: "1",
          user_id: "2391293",
          recharge_amount: "1230元",
          recharge_time: "2017-12-23 12:00",
          order_number: "012232334566"
        },
        {
          key: "2",
          id: "2",
          user_id: "2391293",
          recharge_amount: "1230元",
          recharge_time: "2017-12-23 12:00",
          order_number: "012232334566"
        }
      ],
      pagination: {
        total: this.getTableDataSum(),
        defaultPageSize: 10,
        showQuickJumper: true,
        showTotal: total => `总计 ${total} 条`
      }
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
    },
    datePickerOnChange(date, dateString) {
      console.log(date, dateString);
    },
    getTableDataSum() {
      return 2;
    }
  }
};
</script>
