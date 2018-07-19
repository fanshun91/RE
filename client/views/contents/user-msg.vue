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
              <label class="tip" for="msg_text">留言内容</label>
              <a-input id="msg_text" size="large" placeholder="请输入" />
            </a-form-item>
            <a-form-item>
              <span class="tip">留言状态</span>
              <a-select defaultValue="全部" style="width: 120px" @change="handleChange">
                <a-select-option value="全部">全部</a-select-option>
                <a-select-option value="启用">启用</a-select-option>
                <a-select-option value="禁用">禁用</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <span class="tip">留言日期</span>
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
                :title="'确定'+reverseState(record.account_state)+'此账户'"
                okText="确认"
                cancelText="取消"
                @confirm="() => record.account_state = reverseState(record.account_state)">
                <a class="op-btn" href="#">{{reverseState(record.account_state)}}</a>
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
    title: "小鱼头条-用户留言"
  },
  data() {
    return {
      site: "2",
      list: [
        {
          name: "红包通知",
          path: "/enve_notice",
          key: "1"
        },
        {
          name: "用户留言",
          path: "/user_msg",
          key: "2"
        }
      ],
      curPage: "用户留言",
      columns: [
        {
          title: "序号",
          dataIndex: "id"
        },
        {
          title: "留言时间",
          dataIndex: "msg_time"
        },
        {
          title: "留言账号信息",
          dataIndex: "msg_account_info"
        },
        {
          title: "留言内容",
          dataIndex: "msg_content"
        },
        {
          title: "被留言用户账号信息",
          dataIndex: "receive_msg_account"
        },
        {
          title: "状态",
          dataIndex: "account_state"
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: {
            customRender: "operation"
          }
        }
      ],
      tableData: [
        {
          key: "1",
          id: "1",
          msg_time: "2017-12-23 12:00",
          msg_account_info: "微信ID：09328372",
          msg_content: "非常感谢",
          receive_msg_account: "微信ID：09328378",
          account_state: "启用"
        },
        {
          key: "2",
          id: "2",
          msg_time: "2017-12-23 12:00",
          msg_account_info: "微信ID：09328372",
          msg_content: "非常感谢",
          receive_msg_account: "微信ID：09328378",
          account_state: "禁用"
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
      return state === "启用" ? "禁用" : "启用";
    },
    getTableDataSum() {
      return 2;
    }
  }
};
</script>
