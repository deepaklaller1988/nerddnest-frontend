export const capitalizeName = (name:any) => {
    if (!name) return '';
    return name? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase():"";
  };
  