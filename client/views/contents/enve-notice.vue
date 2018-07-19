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
                <label class="tip" for="re_notice_id">红包通知ID</label>
                <a-input id="re_notice_id" size="large" placeholder="请输入" />
              </a-form-item>
              <a-form-item>
                <label class="tip" for="user_id">用户微信ID/昵称</label>
                <a-input id="user_id" size="large" placeholder="请输入" />
              </a-form-item>
              <a-form-item>
                <label class="tip" for="text_content">文字内容</label>
                <a-input id="text_content" size="large" placeholder="请输入" />
              </a-form-item>
              <a-form-item>
                <span class="tip">通知状态</span>
                <a-select defaultValue="全部" style="width: 120px" @change="handleChange">
                  <a-select-option value="全部">全部</a-select-option>
                  <a-select-option value="启用">启用</a-select-option>
                  <a-select-option value="禁用">禁用</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item>
                <span class="tip">发布日期</span>
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
              <template slot="imgs" slot-scope="text, record">
                <img v-for="img in record.imgs" :key="img.id" :src="img.src" style="width: 40px; height: 40px">
              </template>
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
  </div>
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
    title: "小鱼头条-红包通知"
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
      curPage: "红包通知",
      columns: [
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
          title: "相关图片",
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
          dataIndex: "operation",
          scopedSlots: {
            customRender: "operation"
          }
        }
      ],
      tableData: [
        {
          key: "1",
          re_notice_id: "11231",
          publish_time: "2017-12-23 12:00",
          text_content: "兰州牛肉面开业大家，发红包了",
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
            },
            {
              id: "2",
              src:
                "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            }
          ],
          amount_and_number: "100元/2个",
          position_and_radius: "安慧北里逸园商务楼2楼/2km",
          snatch_time: "2017-12-12 12:00",
          merchant_info: "兰州牛肉面",
          account_state: "启用"
        },
        {
          key: "2",
          re_notice_id: "11232",
          publish_time: "2017-12-23 12:00",
          text_content: "兰州牛肉面开业大家，发红包了",
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
            },
            {
              id: "2",
              src:
                "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            }
          ],
          amount_and_number: "100元/2个",
          position_and_radius: "安慧北里逸园商务楼2楼/2km",
          snatch_time: "2017-12-12 12:00",
          merchant_info: "兰州牛肉面",
          account_state: "启用"
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
