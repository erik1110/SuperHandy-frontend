const { formRules, rulePhone, ruleEmail, ruleAddress, ruleRequired } = useFormUtil()
const _formRules = formRules()
export const postTaskConfig = {

    // 表單提示
    hintMsgs: _formRules,

    // 表單規則
    rules: {
        draft: {
            title: [ruleRequired],
            category: [],
            description: _formRules.taskDescription.rule,
            salary: _formRules.taskSalary.rule,
            exposurePlan: [],
            contactInfoName: [],
            contactInfoPhone: [rulePhone],
            contactInfoEmail: [ruleEmail],
            locationCity: [],
            locationDist: [],
            locationAddress: []
        },
        publish: {
            title: [ruleRequired],
            category: [ruleRequired],
            description: [ruleRequired, _formRules.taskDescription.rule[0]],
            salary: _formRules.taskSalary.rule,
            exposurePlan: [(v) => (!!v && v.length > 1) || "必填欄位"],
            contactInfoName: [ruleRequired, _formRules.name.rule[0]],
            contactInfoPhone: [ruleRequired, rulePhone],
            contactInfoEmail: [ruleRequired, ruleEmail],
            locationCity: [ruleRequired],
            locationDist: [ruleRequired],
            locationAddress: [ruleAddress]
        }
    },


    //任務狀態
    taskStatus: {
        addDraft: "addDraft", //新增草稿
        updateDraft: "updateDraft", //更新草稿
        deleteDraft: "deleteDraft", //刪除草稿
        publishFromDraft: "publishFromDraft", //從草稿刊登任務
        published: "published", //直接刊登任務
        republish: "republish", //重新刊登任務
    },


    dialogType: {
        info: 'primary',
        error: 'error'
    }


}