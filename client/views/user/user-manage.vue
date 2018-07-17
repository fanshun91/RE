<template>
  <div>
    <a-layout>
      <Header :curKey="site" />
      <a-layout>
        <Side :list="list" />
        <a-layout style="padding: 0 24px 24px">
          <Crumb :curPage="curPage" />
          <Content>
            <a-form class="common-form" layout="inline" @submit="handleSubmit">
              <a-form-item>
                <label class="tip" for="wxid">微信ID</label>
                <a-input id="wxid" size="large" placeholder="请输入" />
              </a-form-item>
              <a-form-item>
                <label class="tip" for="nkname">昵称</label>
                <a-input id="nkname" size="large" placeholder="请输入" />
              </a-form-item>
              <a-form-item>
                <label class="tip" for="nkname">账户状态</label>
                <a-select
                  size="large"
                  defaultValue="全部"
                  @change="handleChange"
                >
                  <a-select-option v-for="item in selects" :key="item.id">
                    {{item.name}}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item>
                <label class="tip" for="amount">累计提现金额</label>
                <a-input id="amount" size="large" placeholder="请输入" />
              </a-form-item>
              <a-form-item>
                <span class="tip">注册日期</span>
                <a-range-picker size="large" style="width: 275px" :placeholder="['开始日期', '结束日期']" @change="datePickOnChange" />
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
              <template slot="operation" slot-scope="text, record">
                <a-popconfirm
                  v-if="tableData.length"
                  :title="'确定 ' + reverseState(record.account_state) + ' 此账户？'"
                  okText="确认"
                  cancelText="取消"
                  @confirm="() => record.account_state = reverseState(record.account_state)">
                  <a class="op-btn" href="#">{{reverseState(record.account_state)}}</a>
                </a-popconfirm>
                <router-link :to="'/details/'+record.wxid" tag="a" class="op-btn">查看详情</router-link>
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
    Content,
    Crumb
  },
  data() {
    return {
      site: "1",
      list: [
        {
          name: "用户管理",
          path: "/users",
          key: "0"
        }
      ],
      curPage: "用户管理",
      selects: [
        {
          name: "全部",
          id: 1
        },
        {
          name: "禁用",
          id: 2
        },
        {
          name: "启用",
          id: 3
        }
      ],
      columns: [
        {
          title: "序号",
          dataIndex: "id"
        },
        {
          title: "微信ID",
          dataIndex: "wxid"
        },
        {
          title: "昵称",
          dataIndex: "neckname"
        },
        {
          title: "注册时间",
          dataIndex: "register_time"
        },
        {
          title: "最后登录时间",
          dataIndex: "last_login_time"
        },
        {
          title: "累计发送金额",
          dataIndex: "pay_sum"
        },
        {
          title: "累计提现金额",
          dataIndex: "withdraw_sum"
        },
        {
          title: "账户余额",
          dataIndex: "balance"
        },
        {
          title: "账户状态",
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
          wxid: "000012",
          neckname: "young",
          register_time: "2017-12-12 12:00",
          last_login_time: "2017-12-13 12:00",
          pay_sum: "200元",
          withdraw_sum: "10元",
          balance: "12.88元",
          account_state: "启用"
        },
        {
          key: "2",
          id: "2",
          wxid: "000015",
          neckname: "poung",
          register_time: "2017-12-12 12:00",
          last_login_time: "2017-12-13 12:00",
          pay_sum: "200元",
          withdraw_sum: "10元",
          balance: "12.88元",
          account_state: "禁用"
        },
        {
          key: "3",
          id: "1",
          wxid: "000012",
          neckname: "young",
          register_time: "2017-12-12 12:00",
          last_login_time: "2017-12-13 12:00",
          pay_sum: "200元",
          withdraw_sum: "10元",
          balance: "12.88元",
          account_state: "启用"
        },
        {
          key: "4",
          id: "2",
          wxid: "000015",
          neckname: "poung",
          register_time: "2017-12-12 12:00",
          last_login_time: "2017-12-13 12:00",
          pay_sum: "200元",
          withdraw_sum: "10元",
          balance: "12.88元",
          account_state: "禁用"
        },
        {
          key: "5",
          id: "1",
          wxid: "000012",
          neckname: "young",
          register_time: "2017-12-12 12:00",
          last_login_time: "2017-12-13 12:00",
          pay_sum: "200元",
          withdraw_sum: "10元",
          balance: "12.88元",
          account_state: "启用"
        },
        {
          key: "6",
          id: "2",
          wxid: "000015",
          neckname: "poung",
          register_time: "2017-12-12 12:00",
          last_login_time: "2017-12-13 12:00",
          pay_sum: "200元",
          withdraw_sum: "10元",
          balance: "12.88元",
          account_state: "禁用"
        },
        {
          key: "7",
          id: "1",
          wxid: "000012",
          neckname: "young",
          register_time: "2017-12-12 12:00",
          last_login_time: "2017-12-13 12:00",
          pay_sum: "200元",
          withdraw_sum: "10元",
          balance: "12.88元",
          account_state: "启用"
        },
        {
          key: "8",
          id: "2",
          wxid: "000015",
          neckname: "poung",
          register_time: "2017-12-12 12:00",
          last_login_time: "2017-12-13 12:00",
          pay_sum: "200元",
          withdraw_sum: "10元",
          balance: "12.88元",
          account_state: "禁用"
        },
        {
          key: "9",
          id: "1",
          wxid: "000012",
          neckname: "young",
          register_time: "2017-12-12 12:00",
          last_login_time: "2017-12-13 12:00",
          pay_sum: "200元",
          withdraw_sum: "10元",
          balance: "12.88元",
          account_state: "启用"
        },
        {
          key: "10",
          id: "2",
          wxid: "000015",
          neckname: "poung",
          register_time: "2017-12-12 12:00",
          last_login_time: "2017-12-13 12:00",
          pay_sum: "200元",
          withdraw_sum: "10元",
          balance: "12.88元",
          account_state: "禁用"
        },
        {
          key: "11",
          id: "1",
          wxid: "000012",
          neckname: "young",
          register_time: "2017-12-12 12:00",
          last_login_time: "2017-12-13 12:00",
          pay_sum: "200元",
          withdraw_sum: "10元",
          balance: "12.88元",
          account_state: "启用"
        },
        {
          key: "12",
          id: "2",
          wxid: "000015",
          neckname: "poung",
          register_time: "2017-12-12 12:00",
          last_login_time: "2017-12-13 12:00",
          pay_sum: "200元",
          withdraw_sum: "10元",
          balance: "12.88元",
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
    datePickOnChange(date, dateString) {
      console.log(date, dateString);
    },
    reverseState(state) {
      return state === "启用" ? "禁用" : "启用";
    },
    getTableDataSum() {
      return 12;
    }
  }
};
</script>
