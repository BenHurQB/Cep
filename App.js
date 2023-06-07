import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Keyboard } from 'react-native';
import { Alert } from 'react-native';

import api from './src/services/api'

export default function App() {
  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null)
  
  async function buscar(){
    if(cep== ''){
      alert('Digite um cep valido');
      setCep('');
      return;
    }
    if (cep.length != 8) {
      Alert.alert('Erro', 'Digite um CEP com 8 dígitos');
      return;
    }

    try{
      const resposta =  await api.get(`/${cep}/json`);
      console.log(resposta.data);
      if (resposta.data.erro) {
        Alert.alert('CEP não encontrado', 'Por favor, verifique o CEP digitado.');
        return;
      }
      setCepUser(resposta.data);
      Keyboard.dismiss();
    }catch(error){
      console.log('ERROR: ' + error);
    }

  }


  function limpar(){
    setCep('');
    setCepUser('');
    inputRef.current.focus();
  }
  
    
  

  return (
    
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.textBoasVindas}>Bem vindo ao busca Cep!!!</Text>
        <Text style={styles.text}>Informe o CEP</Text>
        <TextInput 
          style={styles.input}
          placeholder="Ex: 50000000"
          value={cep}
          onChangeText={ (texto) => setCep(texto)}
          keyboardType='numeric'
          ref={inputRef}
        />

      </View>

      <View style={styles.areaBtn}>

        <TouchableOpacity 
          style={[styles.botao, {backgroundColor: '#1d75cd'}]}
          onPress={ buscar }>
          <Text style={styles.botaoTexto}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: '#cd3e1d' }]}
          onPress={limpar}>

          <Text style={styles.botaoTexto}>Limpar</Text>
        </TouchableOpacity>
      </View>

      { cepUser && 
        <View style={styles.resultado}>
          
          <Text style={styles.itemTexto}>Rua: {cepUser.logradouro}</Text>
          <Text style={styles.itemTexto}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemTexto}>Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemTexto}>Estado: {cepUser.uf}</Text>
          <Text style={styles.itemTexto}>CEP: {cepUser.cep}</Text>
        </View>
      
      }

      

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bbb',
    
    
  },
  textBoasVindas:{
    color: '#1d75cd',
    marginTop: 100,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold'

  },
  text: {
    marginTop: 50,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold'
  },
  input: {
    textAlign: 'center',
    marginTop: 25,
    backgroundColor: '#FFF',
    borderWidth:1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18,
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },
  botao: {
    marginTop: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    
    
  },
  botaoTexto: {
    fontSize: 16,
    color: '#FFF'
  },
  resultado: {
    flex: 1,
    
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#cd3e1d',
    borderRadius: 5,
    padding: 10,
    marginTop: 50,
    marginBottom: 50,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#1d75cd',
    
  },
    
    

  
  itemTexto: {
    fontSize: 20,
    color: '#FFF',
  }
});
