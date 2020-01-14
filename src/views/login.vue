<template>
<!--
el-form  vue中的表单
:rules  验证规则
:model  数据对象
-->
  <el-form :rules="rules" class="login-container" label-position="left" :model="loginForm"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">RAINBOW</h3>
<!--    与username绑定-->
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
     <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%" @click="submitClick">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
<!--  导出这个login 模块, 供其他模块使用-->
  export default{
    //data需要使用return来导出
    data(){
      return {
        rules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        loginForm: {
          username: 'admin',
          password: 'admin'
        },
        loading: false

      }
    },
    methods: {
      //登录函数
      submitClick: function () {
        this.loading = true;
        this.$postRequest('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        }).then(result=> {
          this.loading = false;
          if (result && result.data.status == 200) {
            //使用data表示后台返回的值
            var data = result.data.data;
            // 调用 mutations, 将数据放入到localStorage
            this.$store.commit('user', data.user);
            this.$store.commit('setToken', data.token);
            this.$store.commit('setExpireTime', data.expireTime);
            //  跳转页面
            this.$router.push('/layout');
          }else{
            this.$message({type: 'error', message: result.data.message});
          }
        });
      }
    }
    //created函数， 初始化函数
    ,created(){
      this.$db.clear()
    }
  }
</script>
<!--css 样式表-->
<style lang="less" scoped>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    // background-image: url(F:\vue_rainbow\rainbow_vue\src\assets\back.jpg);
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

</style>
