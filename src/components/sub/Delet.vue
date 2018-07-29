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
                <el-button size="mini" type="danger" @click="deleteData(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
   
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
            deleteData(ind){
                this.tableData.forEach((v,i)=>{
                    if(v.id==ind){
                        this.tableData.splice(i,1)
                    }
                })
            }
        },
        mounted(){
            axios.post("http://127.0.0.1:3000/userList").then(res => {
                if (res.data.code == 0) {
                    this.tableData = res.data.data;
                    console.log(this.tableData)
                } else {
                    this.$alert(res.data.msg);
                }
            });
        }
    }

</script>