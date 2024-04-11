//Devuelve fecha actual con formato
export const dateNowWithFormat = () => {
    const date = new Date();

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hour}:${minute}`;
    return formattedDate;
};
