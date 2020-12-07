new Vue({
  el: '#app',
  data: {
    contactList: localStorage.contactList ? JSON.parse(localStorage.contactList) : [],
    editContactName: '',
    editContactData: [],
    selectedContact: -1,
    editMode: false,
    editWindowOpen: false,
    selectedContactEdit: -1
  },
  methods: {
    createNewContact: function () {
      this.contactList.push({
        name:this.editContactName,
        other: others
      });
      this.saveListLocally();
    },
    saveContact: function () {
      this.contactList[this.selectedContactEdit] = {
        name: this.editContactName,
        other: this.editContactData
      };
      this.saveListLocally();
    },
    saveListLocally: function () {
      localStorage.contactList = JSON.stringify(this.contactList);
    },
    addOtherInputArea: function () {
      this.editContactData.push({
        head:'',
        body:''
      });
    },
    selectContact: function (index) {
      if (this.selectedContact == index || this.editWindowOpen) {
        this.selectedContact = -1;
      } else {
        this.selectedContact = index;
      }
    },
    saveOrEdit: function () {
      if (this.editMode) {
        this.saveContact();
      } else {
        this.createNewContact();
        this.editWindowOpen = false;
      }
      this.editContactName = '';
      this.editContactData = [];
    },
    editContact: function (name, values, index) {
      this.selectedContact = -1;
      this.selectedContactEdit = index;
      this.editContactName = name;
      this.editContactData = values || [];
      this.editWindowOpen = true;
      this.editMode = true;
    },
    closeEdit: function () {
      this.editContactName = '';
      this.editContactData = [];
      this.editWindowOpen = false;
      this.selectedContactEdit = -1;
    }
  }
});