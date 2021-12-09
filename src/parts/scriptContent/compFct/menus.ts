export interface ImenuButtonProps  {
    open: boolean;
    color: string;
    colorHover: string;
    colorActive: string;
    icon:[string, string];
    title: string
    content: any;
    type:string;
    coords: [number, number];
    order: number;
}


export const formerMenu: ImenuButtonProps[] = [
    {   // BUTTON LABEL 
        open: true, 
        color: '#000000',
        colorHover: '#00ff00',
        colorActive: '#ff0000',
        icon:['fas', 'pencil-alt'],
        title: 'Mon bouton',
        content: '() => setDrawBoard(!drawBoard)',
        type:'action',
        coords: [53, 10],
        order: 1 
    },
    {   // BUTTON 2 LABEL 
        open: true,
        color: '#000000',
        colorHover: '#00ff00',
        colorActive: '#ff0000',
        icon:['fas', 'pencil-alt'],
        title: 'Mon bouton',
        content: '() => setDrawBoard(!drawBoard)',
        type:'action',
        coords: [53, 10],
        order: 1 
    },

];

export const studentMenu = {

}