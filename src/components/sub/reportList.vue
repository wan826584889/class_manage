<template>
    <div class="block">
        <el-table style="width: 100%" height="500" :data="list"  >
            <el-table-column prop="uid" label="姓名" width="180" :filters='[{"text":"张龙","value":"张龙"},{"text":"wzx","value":"wzx"},{"text":"zt","value":"zt"},{"text":"张东东","value":"张东东"},{"text":"sunle","value":"sunle"},{"text":"weitengteng","value":"weitengteng"},{"text":"langying","value":"langying"},{"text":"qin","value":"qin"},{"text":"石富强","value":"石富强"},{"text":"chengyan","value":"chengyan"},{"text":"xiaowangzi","value":"xiaowangzi"},{"text":"nana","value":"nana"},{"text":"panbeibei","value":"panbeibei"},{"text":"zhang","value":"zhang"},{"text":"guoyitian","value":"guoyitian"},{"text":"zhaoaqian","value":"zhaoaqian"},{"text":"baijiahao","value":"baijiahao"},{"text":"shiny","value":"shiny"},{"text":"loveme","value":"loveme"},{"text":"二傻子","value":"二傻子"},{"text":"yao","value":"yao"},{"text":"fuwanfeng","value":"fuwanfeng"},{"text":"chenmanjie","value":"chenmanjie"},{"text":"mango","value":"mango"},{"text":"葫芦岛舞王 石富强","value":"葫芦岛舞王 石富强"},{"text":"石成钰","value":"石成钰"}]' :filter-method="filterHandler" >
            </el-table-column>
            <el-table-column prop="date" label="日期" width="180" :filters='[{text:"2018-07-20",value:"2018-07-20"},{text:"2018-07-21",value:"2018-07-21"},{text:"2018-07-22",value:"2018-07-22"},{text:"2018-07-23",value:"2018-07-23"},{text:"2018-07-24",value:"2018-07-24"},{text:"2018-07-25",value:"2018-07-25"},{text:"2018-07-26",value:"2018-07-26"},{text:"2018-07-27",value:"2018-07-27"},{text:"2018-07-28",value:"2018-07-28"},{text:"2018-07-29",value:"2018-07-29"},{ text:"2018-07-30", value:"2018-07-30"},{text:"2018-07-31",value:"2018-07-31"}]'  :filter-method="filterHandler" ></el-table-column>
            <el-table-column prop="score" label="成绩"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios'

    export default{
        data(){
            return {
                list:[],
                currentPage: 1,
                userName:[]
            }
        },
        mounted(){
            this.init()
        },
        methods:{
            init(){
                // 查询uid对应的username
                axios.post('http://127.0.0.1:3000/userList')
                .then(res=>{
                    res.data.data.forEach((item,index)=>{
                        this.userName.push({
                            id:item.id,
                            name:item.username
                        })
                    })

                })
                axios.get('http://127.0.0.1:3000/reportList')
                .then(res=>{
                    let arr = []
                    this.list=res.data
                    this.list.forEach((v,i) => {
                        let item = this.userName[i%this.userName.length].name;
                        let ind = this.userName[i%this.userName.length].id
                        if(v.uid==ind){
                            v.uid=item
                        }
                    });
                })
            },
            changePage(page) {
                this.currentPage = page;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            }
        }
    }
    
</script>