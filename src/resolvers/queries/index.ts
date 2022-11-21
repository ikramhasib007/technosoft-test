import { GraphQLYogaError } from "@graphql-yoga/node";
import Context from "src/context";
import { QueryResolvers } from "src/generated/graphql";
import getUserId from "src/utils/getUserId";

const Query: QueryResolvers = {
  isPalindrome: async (parent, args, context: Context, info) => {
    try {
      return isPalindrome(args.string);
    } catch (error: any) {
      throw new GraphQLYogaError(error);
    }
  },
  groupAnagrams: (parent, args, context, info) => {
    try {
      return getGroupAnagrams(args.strs)
    } catch (error: any) {
      throw new GraphQLYogaError(error);
    }
  },
};

export default Query;

function isPalindrome(str: string) {
  const strArr = str.split('');
  const validCharacters = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const lettersArr: any = [];
  strArr.forEach(char => {
    if(validCharacters.indexOf(char) !== -1) {
      lettersArr.push(char)
    }
  })
  // return lettersArr.join('') === lettersArr.reverse().join('')
  const reverseLetterArr = [];
  for(let i = lettersArr.length - 1; i >= 0; i--) {
    reverseLetterArr.push(lettersArr[i])
  }
  return lettersArr.join('') === reverseLetterArr.join('')
}

function getGroupAnagrams(strArr: string[]) {
  let pairs = [], hashtable = [];
  for(let i = 0; i < strArr.length; i++) {
    let currentStr = strArr[i];
    let counterStrArr = rearrangingLetter(currentStr);
    for(let j = 0; j < counterStrArr.length; j++) {
      if(hashtable.indexOf(counterStrArr[i]) !== -1) {
        pairs.push([currentStr, counterStrArr[i]])
      }
    }
    hashtable.push(currentStr)
  }
  return pairs;
}

function permutations(arr: any[]): any {
  if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
  return arr.reduce(
    (acc, item, i) =>
      acc.concat(
        permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map((val: any) => [
          item,
          ...val,
        ])
      ),
    []
  );
};

function rearrangingLetter(str: string) {
  const permArr = permutations(str.split(''))
  const arr: any = []
  permArr.forEach((item: any) => {
    arr.push(item.join(''))
  })
  return arr;
}
