import graphene

import ecommerce.schema



class Query(ecommerce.schema.Query, graphene.ObjectType):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass
class Mutation(ecommerce.schema.Mutation, graphene.ObjectType):
    pass
schema = graphene.Schema(query=Query, mutation=Mutation)

