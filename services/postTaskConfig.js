const { formRules, rulePhone, ruleEmail, ruleAddress, ruleRequired } = useFormUtil()
const _formRules = formRules()
export const postTaskConfig = {

    // 表單提示
    hintMsgs: {
        counter:{
            title: _formRules.taskTitle.counter,
            category: '',
            description: _formRules.taskDescription.counter,
            salary: '',
            exposurePlan: '',
            contactInfoName: _formRules.name.counter,
            contactInfoPhone: '',
            contactInfoEmail: '',
            locationCity: '',
            locationDist: '',
            locationAddress: _formRules.address.counter,
        },
        hint:{
            title: _formRules.taskTitle.hint,
            category: '',
            description: _formRules.taskDescription.hint,
            salary: '最少需要 10 點超人幣',
            exposurePlan: '',
            contactInfoName: _formRules.name.hint,
            contactInfoPhone: '請輸入有效的手機號碼:09開頭共10碼',
            contactInfoEmail: '請輸入有效的Email格式:abc@email.com',
            locationCity: '',
            locationDist: '',
            locationAddress: _formRules.address.hint,
        }
    },

    // 表單規則
    rules: {
        draft: {
            title: _formRules.taskTitle.rule,
            category: [],
            description: _formRules.taskDescription.rule,
            salary: _formRules.taskSalary.rule,
            exposurePlan: [],
            contactInfoName: _formRules.name.rule,
            contactInfoPhone: [rulePhone],
            contactInfoEmail: [ruleEmail],
            locationCity: [],
            locationDist: [],
            locationAddress: [ruleAddress]
        },
        publish: {
            title: _formRules.taskTitle.rule,
            category: [ruleRequired],
            description: [ruleRequired, _formRules.taskDescription.rule[0]],
            salary: _formRules.taskSalary.rule,
            exposurePlan: [(v) => (!!v && v.length > 1) || "必填欄位"],
            contactInfoName: [ruleRequired, _formRules.name.rule[0]],
            contactInfoPhone: [ruleRequired, rulePhone],
            contactInfoEmail: [ruleRequired, ruleEmail],
            locationCity: [ruleRequired],
            locationDist: [ruleRequired],
            locationAddress: [ruleRequired, ruleAddress]
        }
    },


    //任務來源狀態
    currentTaskStatus:{
        create:'create',//新增任務
        draft:'draft',//草稿編輯
        unpublished:'unpublished'//下架編輯
    },

    //欄位是否開啟
    fieldDisadled:{
        //全部都可以編輯
        init:{
            title:false,
            category: false,
            description: false,
            salary: false,
            exposurePlan: false,
            contactInfoName: false,
            contactInfoPhone: false,
            contactInfoEmail: false,
            locationCity: false,
            locationDist: false,
            locationAddress: false,
        },
        //只有任務說明,任務圖片,聯絡人可以編輯
        unpublishedEdit:{
            title: true,
            category: true,
            description: false,
            salary: true,
            exposurePlan: true,
            contactInfoName: false,
            contactInfoPhone: false,
            contactInfoEmail: false,
            locationCity: true,
            locationDist: true,
            locationAddress: true,
        }
    },


    //Submit.Button
    taskSubmitter: {
        draftAdd: "draftAdd", //儲存為草稿
        draftUpdate: "draftUpdate", //更新草稿
        draftDelete: "draftDelete", //刪除草稿
        publishFromDraft: "publishFromDraft", //從草稿刊登任務(因為分成兩支API)
        published: "published", //直接刊登任務(因為分成兩支API)
        unpublished: "unpublished", //下架任務編輯儲存
    },


    dialogType: {
        info: 'info',
        error: 'error'
    }


}