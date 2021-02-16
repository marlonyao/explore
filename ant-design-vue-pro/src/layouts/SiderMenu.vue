<template>
  <div style="width: 256px">
    <a-menu
      :default-selected-keys="['/dashboard/monitor']"
      :default-open-keys="['/dashboard', '/form']"
      mode="inline"
      :theme="theme"
      :inline-collapsed="collapsed"
    >
      <template v-for="item in list">
        <a-menu-item v-if="!item.children" :key="item.key">
          <a-icon v-if="item.icon" :type="item.icon" />
          <span>{{ item.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.key" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu";

export default {
  components: {
    "sub-menu": SubMenu
  },
  props: {
    theme: {
      type: String,
      default: "dark"
    }
  },
  data() {
    return {
      collapsed: false,
      list: [
        {
          key: "/dashboard",
          icon: "dashboard",
          title: "仪表盘",
          children: [
            {
              key: "/dashboard/analysis",
              title: "分析页"
            },
            {
              key: "/dashboard/monitor",
              title: "监控页"
            },
            {
              key: "/dashboard/workspace",
              title: "工作台"
            }
          ]
        },
        {
          key: "/form",
          title: "表单",
          icon: "form",
          children: [
            {
              key: "/form/basic-form",
              title: "基础表单"
            },
            {
              key: "/form/step-form",
              title: "分步表单"
            }
          ]
        }
      ]
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    }
  }
};
</script>
