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
              <span class="tip">举报状态</span>
              <a-select defaultValue="全部" style="width: 120px" @change="handleChange">
                <a-select-option value="全部">全部</a-select-option>
                <a-select-option value="已处理">已处理</a-select-option>
                <a-select-option value="未处理">未处理</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <span class="tip">举报时间</span>
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
            class="common-table"
          >
            <template slot="operation" slot-scope="text, record">
              <a-popconfirm
                v-if="tableData.length"
                :title="'确定标记为 '+reverseState(record.tip_state)+ ' ？'"
                okText="确认"
                cancelText="取消"
                @confirm="() => record.tip_state = reverseState(record.tip_state)">
                <a class="op-btn" href="#">{{reverseState(record.tip_state)}}</a>
              </a-popconfirm>
            </template>
          </a-table>
        </Content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import Header from "../../layout/header.vue";
import Side from "../../layout/sidebar.vue";
import Content from "../../layout/content.vue";
import Crumb from "../../layout/breadCrumb.vue";

export default {
  components: {
    Header,
    Side,
    Content,
    Crumb
  },
  metaInfo: {
    title: "小鱼头条-举报管理"
  },
  data() {
    return {
      site: "5",
      list: [
        {
          name: "举报管理",
          path: "/reports",
          key: "1"
        }
      ],
      curPage: "举报管理",
      columns: [
        {
          title: "序号",
          dataIndex: "id"
        },
        {
          title: "举报用户微信ID/昵称",
          dataIndex: "reporter_id"
        },
        {
          title: "举报类型",
          dataIndex: "tip_type"
        },
        {
          title: "联系方式",
          dataIndex: "contact_info"
        },
        {
          title: "举报红包通知ID",
          dataIndex: "tip_msg_id"
        },
        {
          title: "提现时间",
          dataIndex: "withdraw_time"
        },
        {
          title: "举报状态",
          dataIndex: "tip_state"
        },
        {
          title: "操作",
          dataIndex: "send_time",
          scopedSlots: {
            customRender: "operation"
          }
        }
      ],
      tableData: [
        {
          key: "1",
          id: "1",
          reporter_id: "微信ID：09328372",
          tip_type: "虚假信息",
          contact_info: "18811311641",
          tip_msg_id: "2381239",
          withdraw_time: "2017-12-23 13:00",
          tip_state: "未处理"
        },
        {
          key: "2",
          id: "2",
          reporter_id: "微信ID：09328372",
          tip_type: "虚假信息",
          contact_info: "18811311641",
          tip_msg_id: "25620319",
          withdraw_time: "2017-12-23 13:00",
          tip_state: "未处理"
        },
        {
          key: "3",
          id: "3",
          reporter_id: "微信ID：09328372",
          tip_type: "虚假信息",
          contact_info: "18811311641",
          tip_msg_id: "9481932",
          withdraw_time: "2017-12-23 13:00",
          tip_state: "未处理"
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
    reverseState(state) {
      return state === "未处理" ? "已处理" : "未处理";
    },
    getTableDataSum() {
      return 2;
    }
  }
};
</script>
