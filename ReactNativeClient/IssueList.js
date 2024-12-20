import React, {useState} from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Button,
    useColorScheme,
    View,
  } from 'react-native';

  const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

  function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
  }

  async function graphQLFetch(query, variables = {}) {
    try {
        /****** Q4: Start Coding here. State the correct IP/port******/
        const response = await fetch('http://192.168.10.122:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables })
        /****** Q4: Code Ends here******/
      });
      const body = await response.text();
      const result = JSON.parse(body, jsonDateReviver);
  
      if (result.errors) {
        const error = result.errors[0];
        if (error.extensions.code == 'BAD_USER_INPUT') {
          const details = error.extensions.exception.errors.join('\n ');
          alert(`${error.message}:\n ${details}`);
        } else {
          alert(`${error.extensions.code}: ${error.message}`);
        }
      }
      return result.data;
    } catch (e) {
      alert(`Error in sending data to server: ${e.message}`);
    }
  }

// class IssueFilter extends React.Component {
//     render() {
//       return (
//         <>
//         {/****** Q1: Start Coding here. ******/}

//         {/****** Q1: Code ends here ******/}
//         </>
//       );
//     }
// }

class IssueFilter extends React.Component {
  render() {
    return (
      <>
        {/****** Q1: Start Coding here. ******/}
        <Text>This is a placeholder for the Issue Filter.</Text>
        {/****** Q1: Code ends here ******/}
      </>
    );
  }
}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
  });

const width= [40,80,80,80,80,80,200];

// function IssueRow(props) {
//     const issue = props.issue;
//     {/****** Q2: Coding Starts here. Create a row of data in a variable******/}
//     {/****** Q2: Coding Ends here.******/}
//     return (
//       <>
//       {/****** Q2: Start Coding here. Add Logic to render a row  ******/}
      
//       {/****** Q2: Coding Ends here. ******/}  
//       </>
//     );
//   }
  
  
  // function IssueTable(props) {
  //   const issueRows = props.issues.map(issue =>
  //     <IssueRow key={issue.id} issue={issue} />
  //   );

  //   {/****** Q2: Start Coding here. Add Logic to initalize table header  ******/}

  //   {/****** Q2: Coding Ends here. ******/}
    
    
  //   return (
  //   <View style={styles.container}>
  //   {/****** Q2: Start Coding here to render the table header/rows.**********/}
    
  //   {/****** Q2: Coding Ends here. ******/}
  //   </View>
  //   );
  // }

  function IssueRow(props) {
    const issue = props.issue;
    const rowData = [
      issue.id,
      issue.status,
      issue.owner,
      issue.created.toDateString(),
      issue.effort,
      issue.due ? issue.due.toDateString() : '',
      issue.title,
    ];

    return (
      <>
        <Row
          data={rowData}
          widthArr={width}
          style={styles.row}
          textStyle={styles.text}
        />
      </>
    );
  }
  
  function IssueTable(props) {
    const issueRows = props.issues.map(issue => (
      <IssueRow key={issue.id} issue={issue} />
    ));
  
    const headerInfo = [
      'ID',
      'Status',
      'Owner',
      'Created',
      'Effort',
      'Due',
      'Title',
    ];
  
    return (
      <ScrollView horizontal={true}>
        <View sityle={styles.container}>
          <Table>
            <Row
              data={headerInfo}
              widthArr={width}
              textStyle={styles.text}
              style={styles.header}
            />
            {issueRows}
          </Table>
        </View>
      </ScrollView>
    );
  }


  // class IssueAdd extends React.Component {
  //   constructor() {
  //     super();
  //     this.handleSubmit = this.handleSubmit.bind(this);
  //     /****** Q3: Start Coding here. Create State to hold inputs******/
  //     /****** Q3: Code Ends here. ******/
  //   }
  
  //   /****** Q3: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
  //   /****** Q3: Code Ends here. ******/
    
  //   handleSubmit() {
  //     /****** Q3: Start Coding here. Create an issue from state variables and call createIssue. Also, clear input field in front-end******/
  //     /****** Q3: Code Ends here. ******/
  //   }
  
  //   render() {
  //     return (
  //         <View>
  //         {/****** Q3: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
  //         {/****** Q3: Code Ends here. ******/}
  //         </View>
  //     );
  //   }
  // }


  class IssueAdd extends React.Component {
    constructor() {
      super();
      this.state = {
        owner: '',
        title: '',
      };
    }
  
    updateOwner = (text) => {
      this.setState({ owner: text });
    };
  
    updateTitle = (text) => {
      this.setState({ title: text });
    };
  
    submitIssue = () => {
      const issue = {
        owner: this.state.owner,
        title: this.state.title,
        due: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), 
      };
      this.props.createIssue(issue);
      this.setState({ owner: '', title: '' });
    };
  
    render() {
      return (
        <View>
          <TextInput
            value={this.state.owner}
            onChangeText={this.updateOwner}
            placeholder="owner"
          />
          <TextInput
            value={this.state.title}
            onChangeText={this.updateTitle}
            placeholder="title"
          />
          <Button title="add" onPress={this.submitIssue} />
        </View>
      );
    }
  }
  
  

// class BlackList extends React.Component {
//     constructor()
//     {   super();
//         this.handleSubmit = this.handleSubmit.bind(this);
//         /****** Q4: Start Coding here. Create State to hold inputs******/
//         /****** Q4: Code Ends here. ******/
//     }
//     /****** Q4: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
//     /****** Q4: Code Ends here. ******/

//     async handleSubmit() {
//     /****** Q4: Start Coding here. Create an issue from state variables and issue a query. Also, clear input field in front-end******/
//     /****** Q4: Code Ends here. ******/
//     }

//     render() {
//     return (
//         <View>
//         {/****** Q4: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
//         {/****** Q4: Code Ends here. ******/}
//         </View>
//     );
//     }
// }

class BlackList extends React.Component {
  constructor() {
    super();
    this.state = { blacklistName: '' };
  }

  // Function to update the blacklist name in state
  updateBlacklistName = (text) => {
    this.setState({ blacklistName: text });
  };

  // Submit function to handle the mutation call
  submitBlacklistName = async () => {
    const query = `
      mutation function($input: String!) {
        addToBlacklist(nameInput: $input)
      }
    `;
    const variables = { input: this.state.blacklistName };
    await graphQLFetch(query, variables);
  };

  render() {
    return (
      <View>
        <TextInput
          value={this.state.blacklistName}
          onChangeText={this.updateBlacklistName}
          placeholder="name"
        />
        <Button title="Blacklist" onPress={this.submitBlacklistName} />
      </View>
    );
  }
}


export default class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      issueList {
        id title status owner
        created effort due
      }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ issues: data.issueList });
    }
  }

  async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
      issueAdd(issue: $issue) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
      this.loadData();
    }
  }

  
  render() {
    return (
      <>
        {/****** Q1: Start Coding here. ******/}
        <IssueFilter />
        {/****** Q1: Code ends here ******/}

        {/****** Q2: Start Coding here. ******/}
        <IssueTable issues={this.state.issues} />
        {/****** Q2: Code ends here ******/}

        {/****** Q3: Start Coding here. ******/}
        <IssueAdd createIssue={this.createIssue} />
        {/****** Q3: Code ends here ******/}

        {/****** Q4: Start Coding here. ******/}
        <BlackList />
        {/****** Q4: Code Ends here. ******/}
      </>
    );
  }
}
