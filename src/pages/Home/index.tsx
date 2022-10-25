import React, { useState, useEffect, useReducer,  } from 'react'; //criando um estado com useState para armazenar o estado.
import './styles.css'
import { Card } from '../../components/Card'; 

type Props = String | number | undefined | any | boolean; //tipagem
type User = {
  name: string;
  avatar: string;
}
export function Home() {   // funcao do conteudo da pagina home

  const [studentName, setStudentName] = useState<Props>(); // estado, primeira posição do vetor é o estado, local onde o conteudo vai ficar armazenado. no segundo é a função que atualiza o estado.
  const [students, setStudents] = useState<Props[]>([]); // estado para armazenar os estudantes da lista de presença. vetor vazio pois os alunos serão adicionados nele.
  const [user, setUser] = useState<User>({} as User) // estado para armazenar o objeto com nome e o avatar.

  function handleAddStudent(){ //função para criar as propriedades do novo student.
    const newStudent: Props = { //constante de um objeto com os valores da propriedade do student.
      name: studentName, //o nome, que ja tem em studentName, o valor digitado no input.
      time: new Date().toLocaleTimeString("pt-br", { //o time pega da função de data atual.
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })  
    };
    setStudents(prevState => [...prevState, newStudent]);// adicionando o objeto no estado setStudents // prevState = o estado anterior, dentro do vetor é o estado anterior mais o novo estado. ... signifca que ele vai permanecer no mesmo vetor e não cria um novo.

    }
    useEffect(() => { //corpo do useEffect, Ações.
      fetch('https://api.github.com/users/aryelzx') //requisição da api do github
      .then(response => response.json() as Props) //then pq eh uma promise, pega a resposta e transforma em json.
      .then(data => { //pega o data da resposta e transforme em um objeto com nome e avatar
        setUser({
          name: data.name,
          avatar: data.avatar_url 
        })
      })
      .catch(e => console.log(e));
    },[
      //estados que o useEffect depende. array de dependência.  por padrão o useEffect é chamado 1x na interface. aqui vc define a dependencia para ser executado.
    ])
        
  return (
    <div className="modal">
    <div className="container"> {/*colocar o conteudo dentro da uma div. ou fragmentação <></> */}
    {/* className ="" adicioanr class a uma tag */}
    <header>
      <h1>Lista de Presença</h1>
      <div>
        <strong>{user.name}</strong> {/* nome que vem do objeto da api */}
        <img src={user.avatar} alt="Profile" /> {/* imagem que vem do objeto da api */}
      </div>
    </header>

    <input 
      type="text"
      placeholder="Digite o nome...." 
      onChange={e => setStudentName(e.target.value)} //propriedade que toda vez que o valor do input muda, ele entrega o novo valor. e pega a funcao setStudentName e atualiza o estado.
     />

    <button type="button" onClick={handleAddStudent}> {/* sempre que clicar no botão adicionar ele chama a funcao handleAddStudent() que */}
      Adicionar
    </button>

    { //chaves dentro do return (conteudo) é para usar o conteudo de uma variável.

    students.map(student =>  //.map percorre cada item que existe na lista || o student é a variavel que será armazenado cada estudante 1 por 1 em cada volta da repetição.
    <Card //propriedade que para cada estudante ele gera um card com as propriedades de student.name e student.time
      key={student.time} //key prop. chave única para cada card. usando o time como chave do componente pois a hora seria única para cada user. 
      name={student.name} // nome = ao nome digitado no input
      time={student.time} 
     />) 
    
    }
    
    </div>
    <footer>
      <p>© Aryel Ramos, 2022</p>
    </footer>
    </div>
  )
}