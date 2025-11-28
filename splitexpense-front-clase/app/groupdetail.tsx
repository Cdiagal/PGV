import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Button, Text, TextInput, View, Alert, Modal } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login, token } = useContext(AuthContext);
  const [currentExpenseId, setCurrentExpenseId] = useState<string|null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newAmount , setNewAmount] = useState(0);
  const [newDescription, setNewDescription] = useState("");
  const [expenses, setExpenses] = useState([
    {
      id: "1",
      desc: "e.description",
      amount: "e.amount",
      paid_by: "e.paid_by",
    },
    {
      id: "2",
      desc: "e.description",
      amount: "e.amount",
      paid_by: "e.paid_by",
    },
  ]);
  const router = useRouter();

  const handleDelete = (id: string) => {
    console.log(`Borro el id: : ${id}`);
    for (let i=0 ; i<expenses.length; i++) {
      console.log(expenses[i]);
      if(expenses[i].id == id){
        expenses.splice(i,1);
        setExpenses([...expenses]);
      }
    }
    Alert.alert("Voy a borrar");
  };

  const handleEdit = () => {
    setModalVisible(false);
    if (currentExpenseId == null) return;
    handleDelete(currentExpenseId)
    const newExpense = {
        id: currentExpenseId,
        desc: newDescription,
        amount: newAmount,
        paid_by: "e.paid_by",
    }
    setExpenses([...expenses, ])
      Alert.alert(`voy a editar el gasto ${currentExpenseId} con cantidad ${newAmount} y con la descripción ${newDescription}`)
  };

  const handleChange = (index: number, field: string, text: string) => {
    
  }

  const openModal = (id: string) => {
    setCurrentExpenseId(id);
    setModalVisible(false);
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text>Mi grupo</Text>
      {expenses.map((e, index) => (
        <View key={e.id}>
          <Text>{`${e.amount} - ${e.desc}`}</Text>
          <Text>{e.desc}</Text>
          <Button title="Actualizar" onPress={()=> handleEdit()} />
          <Button title="Borrar" onPress={()=> handleDelete(e.id)} />
        </View>
      ))}

      <Modal visible={modalVisible}>
            <Text>Editando expense #{currentExpenseId}</Text>
            <TextInput></TextInput>
            <Button title= "Cancelar" onPress={() => setModalVisible(false)}/>
      </Modal>

      <Button title="Volver a mis grupos" onPress={() => router.replace("/")} />
    </View>
  );
}
