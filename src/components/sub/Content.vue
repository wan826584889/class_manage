<template>
    <el-table :data="tableData" style="width: 100%" height="520" v-if="showList">
        <el-table-column label="id" width="50">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
        </el-table-column>
        <el-table-column label="学号" width="280">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.StudentId }}</span>
            </template>
        </el-table-column>
        <el-table-column label="姓名" width="180">
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                    <p>姓名: {{ scope.row.username }}</p>
                    <p>学号: {{ scope.row.StudentId }}</p>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.username }}</el-tag>
                    </div>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div v-else>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.username" disabled ></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form.phone" disabled></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="form.address" disabled></el-input>
            </el-form-item>
            <el-form-item label="出生日期">
                <el-input v-model="form.birthday" disabled></el-input>
            </el-form-item>
            <el-form-item label="已有权限">
                <el-tag closable v-for="(item, index) in myRoler" :key="index" @close="handleDelete(item, index)">
                    {{item.rolername}}
                </el-tag>
            </el-form-item>
            <el-form-item label="全部权限" >
                <span  v-for="(item, index) in allRoler" :key="index" @click="addTag(item)">
                    <el-tag >
                        {{item.rolername}}
                    </el-tag>
                </span>
            </el-form-item>
            <el-button @click="showType()">完成</el-button>
        </el-form>
</div>
</template>

<script>
import axios from 'axios';
    export default{
        data(){
            return{ 
                tableData: [],
                showList:true,
                form:[],
                myRoler:[]
        }
        },
        methods: {
            handleEdit(index,item) {
                this.form = item;
                axios.get("http://127.0.0.1:3000/rolerList?id=" + this.form.id)
                .then(res => {
                    if (res.data.code == 0) {
                        this.allRoler = res.data.allRoler;
                        this.myRoler = res.data.myRoler;
                        this.showList = false;
                    } else {
                        this.$alert(res.data.msg);
                    }
                });
            },
            handleDelete(item,index) {
                axios.get(`http://127.0.0.1:3000/removeRoler?uid=${this.form.id}&rid=${item.rid}`)
                .then(res=>{
                    if(res.data.code==0){
                        this.myRoler.splice(index, 1);
                    }
                })
            },
            addTag(item){
                let index = this.myRoler.findIndex((value)=>{
                    return value.rid == item.id
                })
                if (index != -1){
                    this.$alert('你已有当前角色');
                    return;
                }
                axios.get(`http://127.0.0.1:3000/addRoler?uid=${this.form.id}&rid=${item.id}`)
                .then(res => {
                    if (res.data.code == 0) {
                        this.myRoler.push({
                            rid: item.id,
                            rolername: item.rolername
                        });
                    } else {
                        this.$alert(res.data.msg);
                    }
                });
            },
            showType(){
                this.showList=!this.showList
            }
        },
        mounted(){
            axios.post("http://127.0.0.1:3000/userList").then(res => {
                if (res.data.code == 0) {
                    this.tableData = res.data.data;
                } else {
                    this.$alert(res.data.msg);
                }
            });
        }
    }

</script>