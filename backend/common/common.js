exports.sanitizeUser=(user)=>{
    return {_id:user._id,name:user.name,role:user.role}
}