export const useHelper = () => {
  // 角色中英轉換
  const roleToDisplayRole = (role) => {
    if (role == "helper") return "幫手";
    else if (role == "poster") return "案主";
  };

  return {
    roleToDisplayRole,
  };
};
