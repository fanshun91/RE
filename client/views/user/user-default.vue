<template>
  <div>
    <a-layout>
      <Header :curKey="site" />
      <a-layout>
        <Side :list="list" />
        <a-layout style="padding: 20px 24px 20px">
          <Content style="position: relative">
            <router-link class="gotoPrev" to="/users" tag="a">返回 <a-icon class="giveASign" type="right" /></router-link>
            <a-tabs v-if="matchWxid()" defaultActiveKey="1" @change="callback">
              <a-tab-pane tab="用户详情" key="1" forceRender>
                <div class="info-list">
                  <ul class="info-list-item">
                    <li>用户头像：<a-avatar size="large" style="color: #f56a00; backgroundColor: #fde3cf; vertical-align: middle; margin-left: 10px">U</a-avatar></li>
                    <li>用户昵称：</li>
                  </ul>
                  <ul class="info-list-item">
                    <li>微信ID：</li>
                    <li>注册时间：</li>
                    <li>最后登录时间：</li>
                  </ul>
                  <ul class="info-list-item">
                    <li>累计发送金额：元</li>
                    <li>累计提现金额：元</li>
                    <li>账户余额：元</li>
                  </ul>
                  <ul class="info-list-item">
                    <li>账户状态：</li>
                  </ul>
                </div>
                <h5>商户信息</h5>
                <a-table
                  bordered
                  :dataSource="tableDataA"
                  :columns="columnsA"
                  :pagination="paginationA"
                >
                  <template slot="avator_img" slot-scope="text, record">
                    <a-avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  </template>
                </a-table>
              </a-tab-pane>
              <a-tab-pane tab="订单记录" key="2" forceRender>
                <a-table
                  bordered
                  :dataSource="tableDataB"
                  :columns="columnsB"
                  :pagination="paginationB"
                />
              </a-tab-pane>
              <a-tab-pane tab="提现记录" key="3" forceRender>
                <a-table
                  bordered
                  :dataSource="tableDataC"
                  :columns="columnsC"
                  :pagination="paginationC"
                  class="common-table"
                >
                  <template slot="wd_operation" slot-scope="text, record">
                    <a-popconfirm
                      v-if="!isWithdrawed(record.withdraw_state)"
                      :title="'确定将状态修改为 ' + reverseState(record.withdraw_state, 3) + ' ？'"
                      okText="确定"
                      cancelText="取消"
                      @confirm="() => record.withdraw_state = reverseState(record.withdraw_state, 3)"
                    >
                      <a class="op-btn" href="#">{{reverseState(record.withdraw_state, 3)}}</a>
                    </a-popconfirm>
                    <span v-else> --- </span>
                  </template>
                </a-table>
              </a-tab-pane>
              <a-tab-pane tab="红包通知" key="4" forceRender>
                <a-form class="common-form" layout="inline" @submit="handleSubmit">
                  <a-form-item>
                    <label class="tip" for="re_notice_id">红包通知ID</label>
                    <a-input id="re_notice_id" size="large" placeholder="请输入" />
                  </a-form-item>
                  <a-form-item>
                    <label class="tip" for="re_notice_id">文字内容</label>
                    <a-input id="text_content" size="large" placeholder="请输入" />
                  </a-form-item>
                  <a-form-item>
                    <a-button type="primary" size="large" htmlType="submit">查找</a-button>
                  </a-form-item>
                </a-form>
                <a-table
                  bordered
                  :dataSource="tableDataD"
                  :columns="columnsD"
                  :pagination="paginationD"
                >
                  <template slot="imgs" slot-scope="text, record">
                    <img v-for="img in record.imgs" :key="img.id" :src="img.src" style="width: 40px; height: 40px">
                  </template>
                  <template slot="dt_operation" slot-scope="text, record">
                    <a-popconfirm
                      v-if="tableDataD.length"
                      :title="'确定 ' + reverseState(record.account_state) + ' 此账户？'"
                      okText="确认"
                      cancelText="取消"
                      @confirm="() => record.account_state = reverseState(record.account_state)">
                      <a class="op-btn" href="#">{{reverseState(record.account_state)}}</a>
                    </a-popconfirm>
                  </template>
                </a-table>
              </a-tab-pane>
            </a-tabs>
            <span v-else>用户查询出错！</span>
          </Content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from "../../layout/header.vue";
import Side from "../../layout/sidebar.vue";
import Content from "../../layout/content.vue";

export default {
  components: {
    Header,
    Side,
    Content
  },
  props: ["wxid"],
  metaInfo: {
    title: "小鱼头条-用户详情"
  },
  data() {
    return {
      site: "1",
      list: [
        {
          name: "用户管理",
          path: "/users",
          key: 1
        }
      ],
      imtationArr: ["000012", "000015"],
      columnsA: [
        {
          title: "商户头像",
          dataIndex: "avator",
          scopedSlots: {
            customRender: "avator_img"
          }
        },
        {
          title: "商户名称",
          dataIndex: "name"
        },
        {
          title: "联系电话",
          dataIndex: "phone"
        },
        {
          title: "商户地址",
          dataIndex: "site"
        },
        {
          title: "链接网址",
          dataIndex: "weblink"
        },
        {
          title: "所属行业",
          dataIndex: "business"
        }
      ],
      columnsB: [
        {
          title: "序号",
          dataIndex: "id"
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
      columnsC: [
        {
          title: "序号",
          dataIndex: "id"
        },
        {
          title: "提现金额",
          dataIndex: "withdraw_amount"
        },
        {
          title: "提现时间",
          dataIndex: "withdraw_time"
        },
        {
          title: "提现状态",
          dataIndex: "withdraw_state"
        },
        {
          title: "操作",
          dataIndex: "wd_operation",
          scopedSlots: {
            customRender: "wd_operation"
          }
        }
      ],
      columnsD: [
        {
          title: "红包通知ID",
          dataIndex: "re_notice_id"
        },
        {
          title: "发布时间",
          dataIndex: "publish_time"
        },
        {
          title: "文字内容",
          dataIndex: "text_content"
        },
        {
          title: "有关图片",
          dataIndex: "imgs",
          scopedSlots: {
            customRender: "imgs"
          }
        },
        {
          title: "红包金额/个数",
          dataIndex: "amount_and_number"
        },
        {
          title: "红包定位/领取半径",
          dataIndex: "position_and_radius"
        },
        {
          title: "开抢时间",
          dataIndex: "snatch_time"
        },
        {
          title: "商户信息",
          dataIndex: "merchant_info"
        },
        {
          title: "状态",
          dataIndex: "account_state"
        },
        {
          title: "操作",
          dataIndex: "dt_operation",
          scopedSlots: {
            customRender: "dt_operation"
          }
        }
      ],
      tableDataA: [
        {
          key: "1",
          avator: "../../assets/images/123.jpg",
          name: "大宝护肤连锁店",
          phone: "12323888990",
          site: "北京市安慧北里小区10号",
          weblink: "wwww.anhuibeili.com",
          business: "化妆品"
        },
        {
          key: "2",
          avator: "../../assets/images/123.jpg",
          name: "大宝护肤连锁店",
          phone: "12323888990",
          site: "北京市安慧北里小区10号",
          weblink: "wwww.anhuibeili.com",
          business: "化妆品"
        }
      ],
      tableDataB: [
        {
          key: "1",
          id: "1",
          recharge_amount: "100元",
          recharge_time: "2017-12-12 12:00:30",
          order_number: "012232334445201"
        },
        {
          key: "2",
          id: "2",
          recharge_amount: "1000元",
          recharge_time: "2017-12-12 12:00:32",
          order_number: "012232334445202"
        }
      ],
      tableDataC: [
        {
          key: "1",
          id: "1",
          withdraw_amount: "100元",
          withdraw_time: "2017-12-12 11:30:20",
          withdraw_state: "锁定中"
        },
        {
          key: "2",
          id: "2",
          withdraw_amount: "200元",
          withdraw_time: "2017-12-12 11:30:22",
          withdraw_state: "提现中"
        },
        {
          key: "3",
          id: "3",
          withdraw_amount: "200元",
          withdraw_time: "2017-12-12 11:30:22",
          withdraw_state: "已提现"
        }
      ],
      tableDataD: [
        {
          key: "1",
          re_notice_id: "01231",
          publish_time: "2017-12-23 12:00",
          text_content: "兰州牛肉面开业了，大家来领红包",
          imgs: [
            {
              id: "0",
              src:
                "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            {
              id: "1",
              src:
                "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            }
          ],
          amount_and_number: "100元/2个",
          position_and_radius: "逸园商务楼2楼 / 2km",
          snatch_time: "2017-12-12 13:00",
          merchant_info: "兰州牛肉面",
          account_state: "启用"
        },
        {
          key: "2",
          re_notice_id: "02399",
          publish_time: "2017-12-23 12:04",
          text_content: "兰州牛肉面开业了，大家来领红包",
          imgs: [
            {
              id: "0",
              src:
                "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            {
              id: "1",
              src:
                "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            }
          ],
          amount_and_number: "100元/2个",
          position_and_radius: "逸园商务楼2楼 / 2km",
          snatch_time: "2017-12-13 12:00",
          merchant_info: "兰州牛肉面",
          account_state: "禁用"
        }
      ],
      paginationA: {
        total: this.getTableDataSumA(),
        defaultPageSize: 10,
        showQuickJumper: true,
        showTotal: total => `总计 ${total} 条`
      },
      paginationB: {
        total: this.getTableDataSumB(),
        defaultPageSize: 10,
        showQuickJumper: true,
        showTotal: total => `总计 ${total} 条`
      },
      paginationC: {
        total: this.getTableDataSumC(),
        defaultPageSize: 10,
        showQuickJumper: true,
        showTotal: total => `总计 ${total} 条`
      },
      paginationD: {
        total: this.getTableDataSumD(),
        defaultPageSize: 10,
        showQuickJumper: true,
        showTotal: total => `总计 ${total} 条`
      }
    };
  },
  props: ["wxid"],
  methods: {
    matchWxid() {
      return this.imtationArr.indexOf(this.wxid) > -1 ? true : false;
    },
    callback() {},
    handleSubmit(e) {
      e.preventDefault();
    },
    getTableDataSumA() {
      return 2;
    },
    getTableDataSumB() {
      return 2;
    },
    getTableDataSumC() {
      return 3;
    },
    getTableDataSumD() {
      return 2;
    },
    isWithdrawed(state) {
      return state === "已提现" ? true : false;
    },
    reverseState(state, tabsite) {
      if (tabsite == "3") {
        return state === "锁定中" ? "提现中" : "锁定中";
      }

      return state === "禁用" ? "启用" : "禁用";
    }
  }
};
</script>

<style>
.gotoPrev {
  position: absolute;
  right: 28px;
  color: #666;
  z-index: 3;
}
.gotoPrev:hover {
  color: #292929;
}
.gotoPrev .giveASign {
  transition: all ease-out 0.3s;
}
.gotoPrev:hover .giveASign {
  transform: translateX(5px);
}

.info-list {
  padding: 5px;
}
.info-list h5 {
  margin-top: 16px;
  padding: 0 10px;
  line-height: 40px;
  font-size: 15px;
  color: #666;
}
.info-list-item {
  height: 60px;
  padding: 5px 0;
}
.info-list-item li {
  display: inline-block;
  width: 240px;
  line-height: 60px;
}
</style>
