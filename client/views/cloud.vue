<template>
  <div id="login-container">
    <el-form class="login-form">
        <h3 class="title">雲端分享空間（Preview版暫未上線）</h3>
        <el-form-item>
            <span class="svg-container">
                <img src="/icon/menu/user.svg">
            </span>
            <el-input name="username" type="text" placeholder="username"/>
        </el-form-item>
        <el-form-item>
            <span class="svg-container">
                <img src="/icon/menu/passwd.svg">
            </span>
            <el-input name="password" type="password" placeholder="password"/>
        </el-form-item>
        <el-button type="primary" style="width:100%;margin-bottom:30px;">登入帳號</el-button>
    </el-form>
  </div>
</template>
<script>

export default {
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>

<style scoped>
#login-container{
    background-color: #2d3a4b;
    height: 100%;
    width: 100%;
}

.el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    border: 0px;
}

.login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
}

.el-form{
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;

}

.el-form-item {
    width: 520px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
}

.svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
}

.svg-container img{
    width: 16px;
    height: 16px;
}

.title {
    font-size: 26px;
    font-weight: 400;
    color: #eee;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
}

</style>
