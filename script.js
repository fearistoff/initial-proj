new Vue({
  el: '#app',
  data: {
    contactList: localStorage.contactList ? JSON.parse(localStorage.contactList) : [],
    editContactName: '',
    editContactData: [],
    editWindowShow: false,
    editWindowOpen: false,
    selectedContactEdit: 0,
    editHistoryMain: [],
    editHistoryEdit: [],
    notifуData: {
      head: '',
      body: '',
      callback: undefined,
      show: false
    },
    editMode: false
  },
  methods: {
    createNewContact: function () {
      this.updateHistory();
      this.contactList.push({
        name: this.editContactName,
        other: this.editContactData
      });
      this.saveListLocally();
    },
    saveContact: function () {
      this.updateHistory();
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
      this.updateHistory();
      this.editContactData.push({
        head: '',
        body: ''
      });
    },
    saveOrEdit: function () {
      if (this.checkForms()) {
        this.showNotify("Ошибка", "Заполните все поля, пожалуйста!")
      } else {
        this.closeEdit();
        if (this.editWindowShow) {
          this.saveContact();
        } else {
          this.createNewContact();
          this.editWindowOpen = false;
        }
        this.clearInputs();
      }
    },
    editContact: function (index) {
      this.selectedContactEdit = index;
      this.editContactName = this.contactList[this.selectedContactEdit].name + '';
      this.editContactData = JSON.parse(JSON.stringify(this.contactList[this.selectedContactEdit].other)) || [];
      this.editWindowOpen = true;
      this.editWindowShow = true;
      this.updateHistory();
    },
    clearInputs: function () {
      this.editContactName = '';
      this.editContactData = [];
      this.editHistoryEdit = [];
    },
    closeEdit: function () {
      this.editWindowOpen = false;
      this.editWindowShow = false;
    },
    newContact: function () {
      this.editContactName = '';
      this.editContactData = [{
        head: '',
        body: ''
      }]
      this.editWindowOpen = true;
      this.editWindowShow = false;
      this.updateHistory();
    },
    undo: function () {
      if (this.editWindowOpen) {
        if (this.editHistoryEdit.length != 0) {
          this.editContactData = this.editHistoryEdit[this.editHistoryEdit.length - 1].data;
          this.editContactName = this.editHistoryEdit[this.editHistoryEdit.length - 1].name;
          this.editHistoryEdit.splice(this.editHistoryEdit.length - 1);
        }
      } else {
        if (this.editHistoryMain.length != 0) {
          this.contactList = JSON.parse(JSON.stringify(this.editHistoryMain))[0];
          this.editHistoryMain.splice(this.editHistoryMain.length - 1);
          this.saveListLocally();
        }
      }
    },
    updateHistory: function () {
      if (this.editWindowOpen) {
        this.editHistoryEdit.push({
          name: this.editContactName + '',
          data: JSON.parse(JSON.stringify(this.editContactData))
        });
      } else {
        this.editHistoryMain.push(JSON.parse(JSON.stringify(this.contactList)));
      }
    },
    clickUndo: function () {
      this.showNotify('Отмена', 'Подтвердите отмену последнего действия', this.undo.bind(this));
    },
    showNotify: function (head, body, callback) {
      this.notifуData = {
        head: head,
        body: body,
        callback: callback || function () {
          undefined;
        },
        show: true
      };
    },
    closeNotif: function () {
      this.notifуData = {
        head: '',
        body: '',
        callback: undefined,
        show: false
      };
    },
    checkForms: function () {
      let isEmpty = false;
      this.editContactData.forEach(item => {
        if (item.body == '' || item.head == '') {
          isEmpty = true;
        }
      });
      if (this.editContactName == '') {
        isEmpty = true;
      }
      return isEmpty;
    },
    deleteContact: function (index) {
      this.updateHistory();
      this.contactList.splice(index, 1);
      this.saveListLocally();
    },
    clickDelete: function (index) {
      this.showNotify('Удаление', 'Подтвердите удаление этого контакта', this.deleteContact.bind(this, index));
    },
    toggleEditMode: function () {
      if (this.editMode) {
        this.editMode = false;
      } else {
        this.editMode = true;
      }
    }
  }
});