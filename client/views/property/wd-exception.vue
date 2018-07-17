<template>
  <div>
    <a-layout>
      <Header :curKey="site" />
      <a-layout>
        <Side :list="list" />
        <a-layout style="padding: 0 24px 20px">
          <Crumb :curPage="curPage" />
          <Content style="position: relative">
            <a-form class="common-form" layout="inline" @submit="handleSubmit">
              <a-form-item>
                <label class="tip" for="wxid">用户微信ID/昵称</label>
                <a-input id="wxid" size="large" placeholder="请输入" />
              </a-form-item>
              <a-form-item>
                <label class="tip" for="withdraw_amount">提现金额</label>
                <a-input id="withdraw_amount" size="large" placeholder="请输入" />
              </a-form-item>
              <a-form-item>
                <span class="tip">提现时间</span>
                <a-range-picker size="large" style="width: 275px" :placeholder="['开始日期', '结束日期']" @change="datePickerOnChange" />
              </a-form-item>
              <a-form-item>
                <a-button type="primary" size="large" htmlType="submit">查找</a-button>
              </a-form-item>
            </a-form>
            <a-table
              bordered
              :dataSource="tableData"
              :columns="columns"
              :pagination="pagination"
              class="common-table"
            >
              <template slot="wd_operation" slot-scope="text, record">
                <a-popconfirm
                  v-if="tableData.length"
                  :title="'确认标记为 ' + reverseState(record.wd_state) + ' ？'"
                  okText="确认"
                  cancelText="取消"
                  @confirm="() => record.wd_state = reverseState(record.wd_state)"
                >
                  <a class="op-btn" href="#">{{reverseState(record.wd_state)}}</a>
                </a-popconfirm>
              </template>
            </a-table>
          </Content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from "../../layout/header.vue";
import Side from "../../layout/sidebar.vue";
import Crumb from "../../components/breadCrumb.vue";
import Content from "../../layout/content.vue";

export default {
  components: {
    Header,
    Side,
    Crumb,
    Content
  },
  data() {
    return {
      site: "4",
      list: [
        {
          name: "提现记录",
          path: "/wd_records",
          key: 1
        },
        {
          name: "待审核提现",
          path: "/pendings",
          key: 2
        },
        {
          name: "异常提现",
          path: "/exceptions",
          key: 3
        }
      ],
      curPage: "异常提现",
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
          title: "提现金额",
          dataIndex: "withdraw_amount"
        },
        {
          title: "账户余额",
          dataIndex: "account_balance"
        },
        {
          title: "提现时间",
          dataIndex: "withdraw_time"
        },
        {
          title: "异常说明",
          dataIndex: "excep_description"
        },
        {
          title: "状态",
          dataIndex: "wd_state"
        },
        {
          title: "操作",
          dataIndex: "wd_operation",
          scopedSlots: {
            customRender: "wd_operation"
          }
        }
      ],
      tableData: [
        {
          key: "1",
          id: "1",
          user_id: "23923178",
          withdraw_amount: "100元",
          account_balance: "1000元",
          withdraw_time: "2017-12-12 11:30:20",
          excep_description: "领取金额、账户余额、提现金额记录不匹配",
          wd_state: "未处理"
        },
        {
          key: "2",
          id: "2",
          user_id: "23923178",
          withdraw_amount: "200元",
          account_balance: "1000元",
          withdraw_time: "2017-12-12 11:30:22",
          excep_description: "周累计提现金额超过100元",
          wd_state: "未处理"
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
