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


    //Submit.Button
    taskSubmitter: {
        draftAdd: "draftAdd", //新增草稿
        draftUpdate: "draftUpdate", //更新草稿
        draftDelete: "draftDelete", //刪除草稿
        publishFromDraft: "publishFromDraft", //從草稿刊登任務(因為分成兩支API)
        published: "published", //直接刊登任務(因為分成兩支API)
        republish: "republish", //重新刊登任務
    },


    dialogType: {
        info: 'info',
        error: 'error'
    }


}