const groups = [
  {
    id: 1,
    name: 'Дети',
    groups: [
      {
        id: 2,
        name: 'Имеющие редкие заболевания',
        groups: [
          {
            id: 3,
            name: 'Spina Bifida',
            groups: [],
          },
          {
            id: 4,
            name: 'Буллёзный эпидермолиз',
            groups: [],
          },
        ],
      },
      {
        id: 5,
        name: 'С инвалидностью',
        groups: [],
      },
    ],
  },
  {
    id: 6,
    name: 'Профессиональные сообщества',
    groups: [],
  },
];

const addButton = document.querySelector('#add-button');
const dropdownList = document.querySelector('#dropdown');
const chips = document.querySelector('#chips');

const addButtonHandler = (evt) => {
  evt.preventDefault();
  dropdownList.classList.toggle('dropdown--hidden');
};

addButton.addEventListener('click', addButtonHandler);

const hasOwnGroup = (obj) => obj.groups.length > 0;

const makeRecObject = (groups) => {
  const listForRender = document.createElement('ul');

  for (let item of groups) {
    const li = document.createElement('li');
    li.textContent = item.name;

    if (hasOwnGroup(item)) {
      li.appendChild(makeRecObject(item.groups));
    }

    listForRender.appendChild(li);
  }

  return listForRender;
};

const list = makeRecObject(groups);
