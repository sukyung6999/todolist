import { useNavigate, useParams } from "react-router-dom";

import StyledButton from "../components/StyledButton";
import Header from "../components/Header";
import Form from "../components/User/Form";
import { useContext, useEffect, useState } from "react";
import { TodosContext } from "../App";

function Edit() {
  const todos = useContext(TodosContext);

  const navigate = useNavigate();
  const { id } = useParams();

  const [originData, setOriginData] = useState([]);

  useEffect(() => {
    const data = todos.filter((todo) => todo.id === id);
    setOriginData(...data);
  }, [todos, id]);

  const goToBack = (
    <StyledButton onClick={() => navigate(-1, { replace: true })}>
      뒤로가기
    </StyledButton>
  );

  return (
    <>
      <Header onLeft={goToBack}>수정하기</Header>
      <Form isEdit={true} originData={originData || []} />
    </>
  );
}
export default Edit;
