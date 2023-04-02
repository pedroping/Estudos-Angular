export const ACCORDIONS = [
    {
      Title: "Home", 
      Icon: "home" ,
      Rotas: [{ rota: './' , label: 'Pagina Inicial'}]
    },
    {
      Title:"Tabela 1",
      Icon:"table_chart",
      Rotas:[{ rota: '/Examples/TableWithFormControls' , label: 'Tabela'}]
    },
    {
      Title:"Tabela 2",
      Icon:"table_chart",
      Rotas: [{ rota: '/Examples/TableWithNgModel' , label: 'Tabela'}]
    },
    {
      Title:"Lugar Secreto",
      Icon: "lock", 
      Rotas: [{ rota: '/Examples/LugarSecreto' , label: 'Lugar Secreto'}]
    },
    {
      Title: "Binding", 
      Icon: "code", 
      Rotas: [
        {
          rota: '/Examples/Data-binding',
          label: 'Data binding',
        },
        {
          rota: '/Examples/StyleClass-binding',
          label: 'Style & Class binding',
        },
        {
          rota: '/Examples/Event-binding',
          label: 'Event binding',
        },
        {
          rota: '/Examples/TwoWayData-binding',
          label: 'Two Way Data binding',
        },
      ]
    }
  ]