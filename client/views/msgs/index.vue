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
              <span class="tip">消息提醒类型</span>
              <a-select defaultValue="全部" style="width: 120px" @change="handleChange">
                <a-select-option value="全部">全部</a-select-option>
                <a-select-option value="红包通知禁用">红包通知禁用</a-select-option>
                <a-select-option value="红包已被领完">红包已被领完</a-select-option>
                <a-select-option value="提现到帐">提现到帐</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <span class="tip">发送时间</span>
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
      site: "6",
      list: [
        {
          name: "消息提醒",
          path: "/msgs",
          key: "1"
        }
      ],
      curPage: "消息提醒",
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
          title: "消息提醒类型",
          dataIndex: "msg_type"
        },
        {
          title: "标题",
          dataIndex: "msg_title"
        },
        {
          title: "内容",
          dataIndex: "msg_content",
          width: "30%"
        },
        {
          title: "发送时间",
          dataIndex: "send_time"
        }
      ],
      tableData: [
        {
          key: "1",
          id: "1",
          user_id: "2391293",
          msg_type: "红包通知禁用",
          msg_title: "红包通知禁用",
          msg_content:
            "尊敬的用户您好，您于2017-12-23 18:30 发布的“兰州牛肉面回馈新老用户”红包通知，由于涉嫌违规被禁用，剩余未领取红包金额将在2天内自动返回到您的账号余额中。",
          send_time: "2017-12-23 13:00"
        },
        {
          key: "2",
          id: "2",
          user_id: "2391293",
          msg_type: "红包已经被领完",
          msg_title: "红包已经被领完",
          msg_content:
            "尊敬的用户您好，您于2017-12-23 18:30 发布的“兰州牛肉面回馈新老用户”红包通知，所有红包都已被领取完啦！",
          send_time: "2017-12-23 13:00"
        },
        {
          key: "3",
          id: "3",
          user_id: "2391293",
          msg_type: "提现到账通知",
          msg_title: "提现到账",
          msg_content:
            "尊敬的用户您好，您于2017-12-23 19:30发起的提现申请，提现金额20.00元，先已提现到您的微信钱包中，请查收。",
          send_time: "2017-12-23 13:00"
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
    handleChange(value) {},
    datePickerOnChange(date, dateString) {
      console.log(date, dateString);
    },
    getTableDataSum() {
      return 3;
    }
  }
};
</script>
