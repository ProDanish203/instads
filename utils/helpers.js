export const extractInitials = (name) => {
    const nameArray = name.split(' ');
  
    const fn = nameArray.length > 0 ? nameArray[0][0].toUpperCase() : '';
    const ln = nameArray.length > 1 ? nameArray[nameArray.length - 1][0].toUpperCase() : '';
    return fn+ln;
}