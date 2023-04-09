export const idlETHVerifyFactory = ({ IDL }) => {
  const AddressV1 = IDL.Record({ 'eth' : IDL.Text });
  const Address = IDL.Variant({ 'V001' : AddressV1 });
  const Result = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : IDL.Text });
  return IDL.Service({
    'getAddr' : IDL.Func([IDL.Text], [Address], ['query']),
    'setETHAddr' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Vec(IDL.Nat8), IDL.Vec(IDL.Nat8)],
        [Result],
        [],
      ),
  });
};
const init = ({ IDL }) => { return [IDL.Principal]; };
