// let obj = {
//     newObj: {
//       obj2: {
//         obj5: {
//           one: 1,
//         },
//       },
//     },
//     obj3: {
//       obj4: { two: 2 },
//     },
// };

// // { 'newObj.obj2.obj5.one': 1, 'obj3.obj4.two': 2 }

// let flatObject = {};

// function flattenObject(obj , flatObject , keyTillNow){
//     for(key in obj){
//         if( typeof obj[key] == "object"){
//             keyTillNow = keyTillNow + key +"."
//             flattenObject( obj[key] , flatObject , keyTillNow);
//         }
//         else{
//             keyTillNow = keyTillNow + key;
//             flatObject[keyTillNow] = obj[key];
//         }
//     }
// }

// flattenObject(obj , flatObject , "");
// console.log(flatObject);

// public static Node midNode(Node head, Node tail){
//     Node slow = head;
//     Node fast = head;
    
//     while(fast.next != null && fast != tail){
//         slow = slow.next;
//         fast = fast.next.next;
//     }
    
//     return slow;
// }

// public static LinkedList mergeSort(Node head, Node tail){
//     // write your code here
    
//     if(head == tail){
//         LinkedList l = new LinkedList();
//         l.addLast(head.data);
//         return l;
//     }
    
//     Node m = midNode(head, tail);
    
//     LinkedList l1 = mergeSort(head, m);
//     LinkedList l2 = mergeSort(m.next, tail);
    
//     LinkedList l3 = mergeTwoSortedLists(l1, l2);
    
//     return l3;
//   }