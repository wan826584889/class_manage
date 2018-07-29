<template>
    <el-row align="middle">
		<el-alert title="账户或密码错误" type="error" center v-if="showType"></el-alert>
        <el-col :span="16"  :offset="4">
            <el-form :model="ruleForm2" status-icon  ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="pass">
                    <el-input v-model="ruleForm2.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
                    <el-button  @click="removeForm()">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
import {hex_md5} from '../utils/md5.js';
import axios from 'axios';
export default {
	data() {
		let validatePass = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入用户名"));
			} else {
				if (this.ruleForm2.checkPass !== "") {
					this.$refs.ruleForm2.validateField("checkPass");
				}
				callback();
			}
		};
		let validatePass2 = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入密码"));
			} else {
				callback();
			}
		};
		return {
			ruleForm2: {
				name: "",
				password: ""
			},
			showType:false
		};
	},
	methods:{
		submitForm(formName){
			this.showType= true
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let data = {};
					data.username = this.ruleForm2.name;
					data.password = hex_md5(this.ruleForm2.password);
					axios.post('http://127.0.0.1:3000/userList', data)
					.then(res=>{
						res.data.data.map((item,index)=>{
							if(data.username ===item.username){
								if(data.password==item.password){
									this.showType = false;
									this.$router.push('/Main');
								}
							}
						})
					})
				}
			});
		},
		removeForm(){
			this.ruleForm2.name=''
			this.ruleForm2.password=''
		}
	}
};
</script>
